import { SetMetadata } from '@nestjs/common';

export interface CustomProperty {
  message?: string;
  enableLog?: boolean;
}

export const Custom = (props: CustomProperty) =>
  SetMetadata('custom_property', props);
