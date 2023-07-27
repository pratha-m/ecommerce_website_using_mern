export const otpGenerator=()=>{
    let otp="";
    const rand="0123456789abcdefghijklmnopqrstuvwxyz";
    for(let i=0;i<5;i++){
        otp+=rand[Math.floor(Math.random()*36)];
    }
    return otp;
}