import { vi } from 'vitest';

export const createDeeplink = vi.fn((params: any) => {
  return `raycast://deeplink?command=${params.command}&context=${JSON.stringify(params.context)}`;
});