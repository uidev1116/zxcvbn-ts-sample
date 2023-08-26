import "./style.css";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnJaPackage from "@zxcvbn-ts/language-ja";

const options = {
  translations: zxcvbnJaPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnJaPackage.dictionary,
  },
};

const passwordStrengthMessage = {
  0: "危険なパスワードです",
  1: "不安なパスワードです",
  2: "注意が必要なパスワードです",
  3: "妥当なパスワードです",
  4: "安全なパスワードです",
};

const input = document.querySelector<HTMLInputElement>(".js-password-strength");
if (input) {
  const {
    passwordStrengthMeter: merterMark,
    passwordStrengthMessage: messageMark,
  } = input.dataset;
  const merter = document.querySelector<HTMLMeterElement>(merterMark || "");
  const message = document.querySelector<HTMLElement>(messageMark || "");

  zxcvbnOptions.setOptions(options);

  input.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    const result = zxcvbn(event.target.value);

    if (merter) {
      merter.value = result.score * 25;
    }
    if (message) {
      message.textContent = passwordStrengthMessage[result.score];
    }
    console.log(result);
  });
}
