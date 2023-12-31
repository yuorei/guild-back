import { validatePassword } from '../domain/passward';
import { validateEmail } from '../domain/email';

// 少なくとも1つの小文字、1つの大文字、1つの数字が含まれ、全体の文字数が少なくとも6文字以上であることをチェックします
describe('パスワード要件確認', () => {
    it('パスワード要件確認: 成功', async () => {
        let passwords: string[] = ['AAAAa1', '1w#@$%DFbbuBU', '1234567890A@w', 'aaaaA1'];
        passwords.forEach(password => {
            let result = validatePassword(password);
            expect(result).toEqual(true);
        });
    });

    it('パスワード要件確認: 失敗', async () => {
        let passwords: string[] = ['aaaaa1', '1111111111111111111', '1w#@$%dfbbubu', '1234567890aw', 'aaaaa1', 'AAAAAA', '', 'a', '@', 'aA1'];
        passwords.forEach(password => {
            let result = validatePassword(password);
            expect(result).toEqual(false);
        });
    });
});

// メインは文字、数字、アンダースコア、プラス、ドット、ハイフンを含むことができます。ドメインはドットで始まり、文字または数字で終わります。中間にハイフンがある場合、それは文字または数字で囲まれている必要があります。
describe('メールアドレス要件確認', () => {
    it('メールアドレス要件確認: 成功', async () => {
        const emailAddresses: string[] = [
            "test@example.com",
            "user@example.com",
            "john.doe@example.com",
            "jane_doe123@example.com",
            "info1234@example.com",
        ];

        emailAddresses.forEach(emailAddresse => {
            let result = validateEmail(emailAddresse);
            expect(result).toEqual(true);
        });
    });

    it('メールアドレス要件確認: 失敗', async () => {
        const invalidEmailAddresses: string[] = [
            "plainaddress", // @がない
            "name@domain", // ドメインがない
            "@domain.com", // ローカル部がない
            "user name@example.com", // スペースが含まれる
            "user!name@example.com", // 使用できない文字が含まれる
            "user@-domain.com", // ドメインの先頭にハイフンがある
            "user@domain-.com", // ドメインの末尾にハイフンがある
            "user@domain..com", // 連続したドットがある
            "user@domain", // ドメインが不完全
            "user@domain.c", // ドメインが短すぎる
            "user@domain.12", // ドメインが数字のみ
            "user@111.222.333.444", // IPアドレス形式
            "user@domain..com" // 連続したドットがある
        ];

        invalidEmailAddresses.forEach(emailAddresse => {
            let result = validateEmail(emailAddresse);
            expect(result).toEqual(false);
        });
    });
});
