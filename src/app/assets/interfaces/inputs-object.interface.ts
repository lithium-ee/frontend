export interface InputsObject {
    name: string;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder: string;
    requirements: Requirements;
}

export interface Requirements {
    minLength: number;
    maxLength: number;
    required: boolean;
    isEmail?: boolean;
    hasToMatch?: string;
    hasToBeMatchedBy?: string;
}
