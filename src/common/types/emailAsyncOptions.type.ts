import { ModuleMetadata } from '@nestjs/common';
import { EmailOptions } from '../interfaces';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';

export type EmailAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<EmailOptions>, 'useFactory' | 'inject'>;
