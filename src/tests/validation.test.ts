import { validatePassword } from '../domain/passward';

describe('パスワード要件確認', () => {
    it('パスワード要件確認: 成功', async () => {
        let passwords: string[] = ['AAAAa1', '1w#@$%DFbbuBU', '1234567890A@w', 'aaaaA1'];
        passwords.forEach(password => {
            let result = validatePassword(password);
            expect(result).toEqual(true);
        });
    });

    it('パスワード要件確認: 失敗', async () => {
        let passwords: string[] = ['aaaaa1','1111111111111111111', '1w#@$%dfbbubu', '1234567890aw', 'aaaaa1', 'AAAAAA', '', 'a', '@', 'aA1'];
        passwords.forEach(password => {
            let result = validatePassword(password);
            expect(result).toEqual(false);
        });
    });
});
