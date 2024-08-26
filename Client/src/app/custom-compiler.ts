import { TranslateCompiler } from '@ngx-translate/core';

export class CustomCompiler extends TranslateCompiler {
    override compile(value: string, lang: string): string | Function {
        throw new Error('Method not implemented.');
    }
    override compileTranslations(translations: any, lang: string) {
        throw new Error('Method not implemented.');
    }
}