// Define types to transform keys
export type CapitalizeKeys<T> = {
    [K in keyof T as Capitalize<string & K>]: T[K];
  };
  
  export type LowerCaseKeys<T> = {
    [K in keyof T as Lowercase<string & K>]: T[K];
  };
  
  // Define a type that can be either CapitalizeKeys or LowerCaseKeys
  export type TransformKeys<T, A extends 'toUpperCase' | 'toLowerCase'> = A extends 'toUpperCase'
    ? CapitalizeKeys<T>
    : LowerCaseKeys<T>;
  
  // Utility function to transform keys
  export function transformKeys<T extends Record<string, any>, A extends 'toUpperCase' | 'toLowerCase'>(
    obj: T,
    action: A,
  ): TransformKeys<T, A> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const transformedKey = key[action]() as keyof TransformKeys<T, A>;
      acc[transformedKey] = value;
      return acc;
    }, {} as TransformKeys<T, A>);
  }