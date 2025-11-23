const calculadora = require("../models/calculadora.js");

test("nome do teste", () => {
	const resultado = calculadora.somar(2, 2);
	expect(resultado).toBe(4);
});

