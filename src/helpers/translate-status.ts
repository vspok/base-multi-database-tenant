export const translateStatus = (currentStatus:string | undefined)=>{
    let status = "";
    switch (currentStatus) {
        case "pending":
            status = 'Aberto';
            break;
        case "waiting":
            status = 'Aguardando';
            break;
        case "waiting":
            status = 'Aguardando';
            break;
        case "greeting":
            status = 'Novo Chamado';
            break;
        case "open":
            status = 'Em atendimento';
            break;
        case "closed":
            status = 'Resolvido';
            break;
        default:
            status = 'Aberto';
            break;
    }
    return status
}
