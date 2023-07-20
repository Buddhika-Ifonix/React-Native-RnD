import speakeasy from 'speakeasy';

const generateOtp = () => {
 
const secret = speakeasy.generateSecret({ length: 20 });
const tokenOtp = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32'
});


return {secret: secret.base32,otp: tokenOtp}

}

export default generateOtp