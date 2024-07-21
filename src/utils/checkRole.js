export function checkRole(){
    const account = localStorage.getItem('account');
    return JSON.parse(account);
};

