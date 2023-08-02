import {getUserByEmail, updateUserPassword, verifyUserEmail} from '../user/user.service';
import {dataSource} from "../../database";
import {PasswordChangeLinkEntity} from "./model/password-change-link.entity";
import {BadRequest} from "http-errors";
import {EmailVerifyLinkEntity} from "./model/email-verify-link.entity";
import {sendMailMessage} from "../mail/mail.service";
import {VerifyOrChangePwdDto} from "./dtos/verify-change.dto";

const passwordChangeRepository = dataSource.getRepository(PasswordChangeLinkEntity);
const emailVerifyRepository = dataSource.getRepository(EmailVerifyLinkEntity);

export async function generateChangePasswordLink(email: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new BadRequest('User not found');
    }
    const changePasswordLink = await createChangePasswordLink(user.id);
    await sendMailChangePasswordLink(email, changePasswordLink)
    console.log(changePasswordLink)
    return "generated";
}

export async function sendMailChangePasswordLink(email: string, changePasswordLink: string) {
    //TODO html
    await sendMailMessage({
        to: email,
        subject: 'Password Change Link',
        html: `/generate-pwd/${changePasswordLink}`
    })
}

export async function deactivatePasswordChangeLink(pwdChangeId: string) {
    const link = await passwordChangeRepository.findOneBy({id: pwdChangeId})

    console.log('here')
    const now = new Date();
    if (!link || link.used || now >= link.expiredDate) { //check to change
        console.log('here not changed')
        return;
    }
    console.log('here changed')

    return link.userId;
}

export async function createChangePasswordLink(userId: string) {
    const now = new Date().getTime()
    const expiresIn = 3600000 //1 hour in ms
    const expiredDate = new Date(now + expiresIn)
    console.log(expiredDate);
    const link = await passwordChangeRepository.save({
        userId: userId,
        active: true,
        expiredDate: expiredDate,
    });

    return link.id
}

export async function verificationUserEmail(verifyId: string, userDto: VerifyOrChangePwdDto) {
    const link = await deactivateEmailVerificationLink(verifyId, userDto.password)
    let updated
    if (link && link.email) {
        updated = await verifyUserEmail(link.userId, link.email);
    }

    return updated;
}

export async function deactivateEmailVerificationLink(referralLink: string, code: string) {
    const link = await emailVerifyRepository.findOneBy({id: referralLink})

    const now = new Date();
    if (!link || link.used || code != link.code
        || now >= link.expiredDate) { //check to change
        return;
    }

    return {
        userId: link.userId,
        email: link.email
    };
}

export async function generateEmailVerificationLink(email: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new BadRequest('User not found');
    }
    const changeEmailLink = await createEmailVerificationLink(user.id, email);
    await sendMailEmailVerifyLink(email, changeEmailLink.id, changeEmailLink.code)
    return changeEmailLink.id;
}

export async function sendMailEmailVerifyLink(email: string, changePasswordLink: string, code: string) {
    //TODO html
    await sendMailMessage({
        to: email,
        subject: 'Password Change Link',
        html: `Code: ${code}`
    })
}

export async function createEmailVerificationLink(userId: string, email: string) {
    const now = new Date().getTime()
    const expiresIn = 600000 //10 min in ms
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiredDate = new Date(now + expiresIn)
    console.log(expiredDate);
    const link = await emailVerifyRepository.save({
        userId: userId,
        email: email,
        active: true,
        code: code,
        expiredDate: expiredDate,
    });

    return {
        id: link.id,
        code: code
    }
}



