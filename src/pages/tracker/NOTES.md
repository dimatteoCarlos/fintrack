en TrackerLayout
aclarar valores de currencyOptions, defaultCrncy y formatNmbCntry,
establecer formato de los numeros a presentar.

pueden haber cuentas con currency distinta a default, o distinto currency entre ellas?.
como se obtiene availbleBudget, se mostrara en usd me imagino.

it seems that there most be a validation of currency, es decir se debe asegurar que no haya conflictos con diferentes tipos de currency, si se va a manejar distintas divisas, como se hara para realizar calculos, se utilizar paridad cambiaria?

en LogoMenuIcon:
definir la funcionalidad del boton, ahorita tiene un link to /accounting
but it has to have an edition functionality, so the shown view has to be a form, and it has to post the info somewhere...where?

/pages/tracker/expense/Expense.tsx
how to get total Expenses amount, with its currency;

for the account options select, do you prefer name or description?

Entiendo entonces que es un formulario donde hay que colocar Expense amount en Amount,y el usuario escribe una description en Note.

Verificar a donde se guardara la informacion, verificar los endpoint para hacer POST.

    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],

manejo de errores cuando se hacen los get de data , donde reflejar el mensaje de error, y cual seria la accion? reintentar? retry?

arreglar los inputs: estilo para los placeholders de amount,

arreglar los estilos para asegurar responsiveness, que se ajuste al viewport, colocar el nav.mainNavbar\_\_container fixed en el bottom of screen

---

establecer las funcionalidades de los botones, establecer los endpoints de los formularios, manejo de errores
pagina not-found bonita

=====
Definir modulo de calculos, backend.

Hayt que meter autenticacion, y validacion.

 que otras paginas o vistas hacen falta?

 




