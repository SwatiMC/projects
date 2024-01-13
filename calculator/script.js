document.addEventListener('DOMContentLoaded', function () {
    // Fetch available currencies from ExchangeRate-API
    fetch('https://open.er-api.com/v6/latest')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            // Populate currency dropdowns
            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option2.value = currency;
                option1.textContent = currency;
                option2.textContent = currency;
                fromCurrencySelect.appendChild(option1);
                toCurrencySelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching currencies:', error));
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    fetch(`https://open.er-api.com/v6/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.result.toFixed(2);
        })
        .catch(error => console.error('Error converting currency:', error));
}
