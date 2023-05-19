console.log(`I'm live"`);
postMessage('READY'); //comunica com quem invocou ele

onmessage = ({data}) => { //ele aguarda a chamada dele e processalas em segundo plano
    console.log('hey from worker', data);
};