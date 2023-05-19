console.log(`I'm live"`);
postMessage('READY'); //comunica com quem invocou ele
postMessage({eventType: 'alive'});

onmessage = ({data}) => { //ele aguarda a chamada dele e processalas em segundo plano
    postMessage({eventType:'progress'}),
    postMessage({eventType: 'ocurrenceUpdate'}),
    console.log('hey from worker', data);
};