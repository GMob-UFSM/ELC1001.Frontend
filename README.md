### INSTRUÇÕES WEATHER API
- Acesse https://openweathermap.org/api, crie uma conta e gere uma API_KEY para usar no aplicativo. 
- Atribua o token na constante WEATHER_API_TOKEN no arquivo [weatherApi.js](https://github.com/ggpereira/ELC1001.Frontend/blob/master/src/services/weatherApi.js)
- Mais detalhes sobre a API em https://openweathermap.org/guide

#### Observações gerais

* Como a API não está implementada, vocês podem escolher como querem receber os dados necessários para construir sua tela. Por exempo: se você recebeu a tela "Meus looks", mas a rota que retorna os looks não está implementada, crie uma variável que contém os dados tais como você gostaria de recebê-los da API. Veja o exemplo do que poderia ser um objeto com dados de entrada:

``` js
const input = [{
    _id: "id_do_look_1",
    name: "nome do look 1",
    description: "descrição do look 1",
    clothe_torso: {
        // Informações da roupa do tronco
    },
    clothe_leg: {
        // Informações da roupa das pernas
    },
    clothe_feet: {
        // Informações do calçado
    }
},
{
    _id: "id_do_look_2",
    name: "nome do look 2",
    description: "descrição do look 2",
    clothe_torso: {
        // Informações da roupa do tronco
    },
    clothe_leg: {
        // Informações da roupa das pernas
    },
    clothe_feet: {
        // Informações do calçado
    }
}
// ...
]
```

* Se você tiver dúvidas ou quiser exemplos de como os dados da API estão estruturados, você pode consultar os arquivos modelo (`*.model.js`) no repositório da API. No caso da tela de "Meus looks", seria interessante saber como os looks e as roupas estão estruturados, para isso você poderia consultar os arquivos `look.routes.js` e `garment.model.js`.
* Se sua rota precisa fazer o upload de uma image para a API (e.g para criar uma peça de roupa), converta-a para Base64 e envie no `body` da requisição
* Se sua rota precisa receber um URL de uma imagem da API (e.g. para mostrar os detalhes de uma peça), use um link de imagem qualquer da internet no seu objeto de entrada (ver primeira observação)
* Se você encontrar problemas ao rodar o app no emulador para Android, utilize os seguintes comandos: cd android && ./gradlew clean && ./gradlew :app:bundleRelease. Se tudo ocorrer sem nenhum erro, rode o aplicativo novamente(não se esqueça de sair do diretorio "android").
* Se você encontrar problemas ao rodar o app no simulador para ios, utilize os seguintes comandos: cd ios && pod install. Se tudo ocorrer sem nenhum erro, rode o aplicativo novamente(não se esqueça de sair do diretorio "ios"). Caso voê não tenha o cocoapods instalado, acesse esse link, https://cocoapods.org/ e instale.





