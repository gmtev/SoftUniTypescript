import { Cipher } from "./contracts/cipher.js";
import { PartialMessageEncoder } from "./contracts/implemented/partialMessageEncoder.js";
import { Language } from "./contracts/language.js";
import { MessageEncoder } from "./contracts/messageEncoder.js";
import { ProcessedCharsType } from "./types.js";

export class LanguageMessageEncoder<
    TLang extends Language, 
    TCipher extends Cipher<TLang>
> extends PartialMessageEncoder implements MessageEncoder {
    private encodedCount = 0;
    private decodedCount = 0;

    constructor(lang: TLang, cipher: TCipher) {
        super(lang, cipher);
    }

    public encodeMessage(secretMessage: unknown) {
        if (typeof secretMessage !== 'string' || secretMessage.length == 0) {
            return "No message";
        }

        const strippedMessage = this.stripForbiddenSymbols(secretMessage);
        const isCompatible = this.language.isCompatibleToCharset(strippedMessage);
        if (!isCompatible) {
            return "Message not compatible.";
        }
        
        const encodedMessage = this.cipher.encipher(strippedMessage);
        this.encodedCount += encodedMessage.length;
        return encodedMessage;
    }

    public decodeMessage(secretMessage: unknown): string {
        if (typeof secretMessage !== 'string' || secretMessage.length == 0) {
            return "No message";
        }

        const isCompatible = this.language.isCompatibleToCharset(secretMessage);
        if (!isCompatible) {
            return "Message not compatible.";
        }

        const decodedMessage = this.cipher.decipher(secretMessage);
        this.decodedCount += decodedMessage.length;
        return decodedMessage;
    }

    public totalProcessedCharacters(type: ProcessedCharsType): string {
        let totalChars = 0;

        switch (type) {
            case 'Encoded':
                totalChars = this.encodedCount;
                break;
            case 'Decoded':
                totalChars = this.decodedCount;
                break;
            case 'Both':
                totalChars = this.encodedCount + this.decodedCount;
                break;    
        }
        
        return `Total processed characters count: ${totalChars}`;
    }

    protected override stripForbiddenSymbols(message: string): string {
          let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
          forbiddenSymbols.forEach(x => message = message.replaceAll(x, ''));
          return message;
    }
}
