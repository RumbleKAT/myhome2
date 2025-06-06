export interface UploadDTO {
  owner: string;
  repo: string;
  path: string;
  data?: any;
  token: string;
}

export enum StatusCode {
  error,
  success,
}

export interface ResponseDTO {
  type: StatusCode;
  message: string;
  data?: any;
}

function convertToString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return value.toString();
  return '';
}

export async function uploadJsonToGitHub(params: UploadDTO): Promise<ResponseDTO> {
  const apiUrl = `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}`;
  const headers = {
    Authorization: `token ${params.token}`,
    Accept: 'application/vnd.github+json',
  };
  let result: ResponseDTO;
  try {
    const jsonString = JSON.stringify(params.data, null, 2);
    const base64Content = Buffer.from(jsonString, 'utf-8').toString('base64');
    const getFileResponse = await fetch(apiUrl, { headers });
    let sha: string | undefined;
    if (getFileResponse.status !== 404) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }
    const payload: any = { message: 'Upload JSON data', content: base64Content };
    if (sha) payload.sha = sha;
    const uploadResponse = await fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers,
    });
    if (!uploadResponse.ok) {
      throw new Error(`GitHub API responded with ${uploadResponse.status}`);
    }
    result = { type: StatusCode.success, message: 'save success' };
  } catch (e) {
    result = { type: StatusCode.error, message: convertToString(e) };
  }
  return result;
}

export async function deleteJsonFromGitHub(params: UploadDTO) {
  const url = `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${params.token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const data = await res.json();
  const sha = data.sha;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${params.token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({ message: 'delete file', sha }),
  });
}

export async function getJsonFromGitHub(params: UploadDTO): Promise<ResponseDTO> {
  const apiUrl = `https://api.github.com/repos/${params.owner}/${params.repo}/contents/${params.path}`;
  const headers = {
    Authorization: `token ${params.token}`,
    Accept: 'application/vnd.github+json',
  };
  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    const responseData = await response.json();
    const contentBase64 = responseData.content;
    const content = Buffer.from(contentBase64, 'base64').toString('utf-8');
    return { type: StatusCode.success, message: 'save success', data: JSON.parse(content) };
  } catch (e) {
    return { type: StatusCode.error, message: convertToString(e) };
  }
}
