const convertButton = document.querySelector("#convert-button")
const currencySelect = document.querySelector(".select-value")

async function convertValues() {

    const inputCurrencyValue = parseFloat(document.querySelector(".input-money").value)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    if (!inputCurrencyValue || inputCurrencyValue <= 0) {
        alert("Digite um valor válido")
        return
    }

    const API_KEY = "a94857e0b6c6d655e76f5a3b"

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`)
        const data = await response.json()
        console.log(data)
        const rates = data.conversion_rates

        let btcRate = null

        try {
            const btcResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl")
            const btcData = await btcResponse.json()

            btcRate = btcData.bitcoin.brl  
        } catch (error) {
            console.log("Erro ao buscar Bitcoin", error)
        }




        let convertedValue
        let formattedValue

        switch (currencySelect.value) {

            case "USD":
                convertedValue = inputCurrencyValue * rates.USD
                formattedValue = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(convertedValue)
                break

            case "EUR":
                convertedValue = inputCurrencyValue * rates.EUR
                formattedValue = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(convertedValue)
                break

            case "GBP":
                convertedValue = inputCurrencyValue * rates.GBP
                formattedValue = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(convertedValue)
                break

            case "BTC":
                if (!btcRate) {
                    alert("Bitcoin indisponível no momento")
                    return
                }
                convertedValue = inputCurrencyValue / btcRate
                formattedValue = convertedValue.toFixed(8) + " BTC"
                break


        }

        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)

        currencyValueConverted.innerHTML = formattedValue

    }

    catch (error) {
        alert("Erro ao buscar cotação da API")
        console.error(error)
    }
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".image-currency")

    if (currencySelect.value == "USD") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"
    }

    if (currencySelect.value == "EUR") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelect.value == "GBP") {
        currencyName.innerHTML = "Libra Esterlina"
        currencyImage.src = "./assets/libra.png"
    }

    if (currencySelect.value == "BTC") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
