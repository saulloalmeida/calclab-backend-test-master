const fs = require("fs");

const exam = fs.readFileSync("./EXAM.txt").toString().split("\n");

const result = [];

var obj = new Object({
  name: "-",
  result: "-",
  unit: "-",
  material: "-",
  metodo: "-",
});

for (let i = 0; i < exam.length; i++) {
  const line = exam[i];
  const value = line.split(":")[1];

  if (line.startsWith("Exame")) {
    obj.name = value.trim();
  }
  if (line.startsWith("Resultado")) {
    const result = Number(
      line
        .replace(/[:]((.*\d*\,\d*|.\d*)(.*))/gi, ":$2")
        .split(":")[1]
        .trim()
        .replace(",", ".")
    );

    const unit = line
      .replace(/[:]((.*\d*\,\d*|.\d*)(.*))/gi, ":$3")
      .split(":")[1]
      .trim();

    obj.result = result;
    obj.unit = unit.trim();
  }
  if (line.startsWith("Material")) {
    obj.material = value.trim();
  }
  if (line.startsWith("Método")) {
    obj.metodo = value.trim();

    result.push(obj); //salva objeto no arrary após atribuir os valores necessários

    // reseta para o valore padrão do objeto e parte para nova iteração
    obj = new Object({
      name: "-",
      result: "-",
      unit: "-",
      material: "-",
      metodo: "-",
    });
  }
  // verifica se é a ultima linha para salvar objeto no array
  if (i + 1 === exam.length) {
    result.push(obj);
  }
}
fs.writeFileSync("RESULT.json", JSON.stringify(result, null, 2));
