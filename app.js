document.addEventListener('DOMContentLoaded', () => {
    const connector = new TonhubConnector({ testnet: true });
    let sessionId = '';
    let sessionSeed = '';
    let walletConfig = null;

    // Connect button
    document.getElementById('connect-button').addEventListener('click', async () => {
        try {
            let session = await connector.createNewSession({
                name: 'My dApp',
                url: 'https://myapp.com'
            });

            sessionId = session.id;
            sessionSeed = session.seed;

            const sessionLink = session.link;
            document.body.innerHTML += `<p>Scan the QR code or visit: <a href="${sessionLink}" target="_blank">${sessionLink}</a></p>`;

            // Wait for session approval
            const session = await connector.awaitSessionReady(sessionId, 5 * 60 * 1000);

            if (session.state === 'ready') {
                walletConfig = session.walletConfig;
                document.getElementById('wallet-address').innerText = walletConfig.address;
                updateBalance();
            } else {
                console.error('Session not ready:', session.state);
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    });

    // Send Transaction button
    document.getElementById('send-transaction-button').addEventListener('click', async () => {
        if (!walletConfig) {
            alert('Connect to the wallet first');
            return;
        }

        const request = {
            seed: sessionSeed,
            appPublicKey: walletConfig.appPublicKey,
            to: 'EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales', // Example address
            value: '1000000000', // Amount in nano-tons
            timeout: 5 * 60 * 1000, // 5 minutes timeout
        };

        try {
            const response = await connector.requestTransaction(request);
            handleTransactionResponse(response);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    });

    // Sign Data button
    document.getElementById('sign-data-button').addEventListener('click', async () => {
        if (!walletConfig) {
            alert('Connect to the wallet first');
            return;
        }

        const payloadToSign = Buffer.concat([Buffer.from([0, 0, 0, 0]), Buffer.from('Some random string')]);
        const payload = beginCell().storeBuffer(payloadToSign).endCell().toBoc({idx: false}).toString('base64');
        const text = 'Please, sign our terms or service and privacy policy';

        const request = {
            seed: sessionSeed,
            appPublicKey: walletConfig.appPublicKey,
            timeout: 5 * 60 * 1000, // 5 minutes timeout
            text: text,
            payload: payload
        };

        try {
            const response = await connector.requestSign(request);
            handleSignResponse(response);
        } catch (error) {
            console.error('Error signing data:', error);
        }
    });

    async function updateBalance() {
        // Example function to update balance
        // Implement your logic to fetch and update the balance here
        document.getElementById('wallet-balance').innerText = 'Fetching...';

        // Simulate fetching balance
        setTimeout(() => {
            document.getElementById('wallet-balance').innerText = '5000000000'; // Example balance
        }, 1000);
    }

    function handleTransactionResponse(response) {
        if (response.type === 'success') {
            console.log('Transaction successful:', response.response);
        } else {
            console.error('Transaction error:', response);
        }
    }

    function handleSignResponse(response) {
        if (response.type === 'success') {
            console.log('Sign data successful:', response.signature);
        } else {
            console.error('Sign data error:', response);
        }
    }
});
