import templateEngine from "../src/template-engine";
import chai from "chai";

describe("Template-engine works correctly", function() {
  it("Should generate HTML-node with class", function() {
    const object = {
      block: "theme"
    };
    chai.expect(templateEngine(object)).to.equal('<div class="theme"></div>');
  });

  it("Should generate HTML-node with custom tag", function() {
    const object = {
      block: "theme",
      tag: "ul"
    };
    chai.expect(templateEngine(object)).to.equal('<ul class="theme"></ul>');
  });

  describe("Correctly compiles different types", function() {
    it("Empty string", function() {
      chai.expect(templateEngine("")).to.equal("");
    });

    it("Empty array", function() {
      chai.expect(templateEngine([])).to.equal("");
    });

    it("Empty object", function() {
      chai.expect(templateEngine({})).to.equal("<div></div>");
    });

    it("Boolean: false", function() {
      chai.expect(templateEngine(false)).to.equal("");
    });

    it("Boolean: true", function() {
      chai.expect(templateEngine(true)).to.equal("");
    });

    it("Undefined", function() {
      chai.expect(templateEngine(undefined)).to.equal("");
    });

    it("Null", function() {
      chai.expect(templateEngine(null)).to.equal("");
    });

    it("Number", function() {
      chai.expect(templateEngine(568)).to.equal(568);
    });

    it("Array of objects", function() {
      const input = [
        {
          block: "theme"
        },
        {},
        {
          block: "input"
        }
      ];
      chai
        .expect(templateEngine(input))
        .to.equal(
          '<div class="theme"></div><div></div><div class="input"></div>'
        );
    });
  });

  describe("Correctly compiles content property", function() {
    it("Correctly compiles content property with object", function() {
      const object = {
        block: "theme",
        content: {
          block: "form"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="theme"><div class="form"></div></div>');
    });

    it("Correctly compiles content property with array", function() {
      const object = {
        block: "form",
        content: [
          {
            block: "input"
          },
          {
            block: "button"
          }
        ]
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form"><div class="input"></div><div class="button"></div></div>'
        );
    });

    it("Correctly compiles several nested content levels", function() {
      const object = {
        block: "form",
        content: [
          {
            block: "group",
            content: [
              {
                block: "input"
              },
              {
                block: "button",
                content: {
                  block: "nested"
                }
              }
            ]
          }
        ]
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form"><div class="group"><div class="input"></div><div class="button"><div class="nested"></div></div></div></div>'
        );
    });
  });

  describe("Correctly compiles elem property", function() {
    it("Correctly compiles elem object with block property", function() {
      const object = {
        block: "form",
        elem: "item"
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item"></div>');
    });

    it("Correctly compiles nested elem object", function() {
      const object = {
        block: "form",
        content: [
          {
            elem: "item"
          }
        ]
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form"><div class="form__item"></div></div>');
    });
  });

  describe("Correctly compiles mods and elemMods property", function() {
    it("Correctly compiles block object with empty mod", function() {
      const object = {
        block: "form",
        mods: {}
      };
      chai.expect(templateEngine(object)).to.equal('<div class="form"></div>');
    });

    it("Correctly compiles block object with string value mod", function() {
      const object = {
        block: "form",
        mods: {
          "space-v": "xxl"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form form_space-v_xxl"></div>');
    });

    it("Correctly compiles block object with number value mod", function() {
      const object = {
        block: "form",
        mods: {
          "space-v": 9
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form form_space-v_9"></div>');
    });

    it("Correctly compiles block object with boolean mod", function() {
      const object = {
        block: "form",
        mods: {
          disabled: true
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form form_disabled"></div>');
    });

    it("Correctly compiles elem object with empty mod", function() {
      const object = {
        block: "form",
        elem: "item",
        elemMods: {}
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item"></div>');
    });

    it("Correctly compiles elem object with string value mod", function() {
      const object = {
        block: "form",
        elem: "item",
        elemMods: {
          "space-v": "xxl"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item form__item_space-v_xxl"></div>');
    });

    it("Correctly compiles elem object with number value mod", function() {
      const object = {
        block: "form",
        elem: "item",
        elemMods: {
          "space-v": 9
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item form__item_space-v_9"></div>');
    });

    it("Correctly compiles elem object with boolean mod", function() {
      const object = {
        block: "form",
        elem: "item",
        elemMods: {
          disabled: true
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item form__item_disabled"></div>');
    });

    it("Should ignore elemMods on block node", function() {
      const object = {
        block: "form",
        elemMods: {
          "space-v": "xxl"
        }
      };
      chai.expect(templateEngine(object)).to.equal('<div class="form"></div>');
    });

    it("Should ignore mods on element node", function() {
      const object = {
        block: "form",
        elem: "item",
        mods: {
          "space-v": "xxl"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item"></div>');
    });

    it("Should works correctly with both mods and elemMods on block node", function() {
      const object = {
        block: "form",
        mods: {
          "space-v": "xxl"
        },
        elemMods: {
          "space-v": "xl"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form form_space-v_xxl"></div>');
    });

    it("Should works correctly with both mods and elemMods on element node", function() {
      const object = {
        block: "form",
        elem: "item",
        mods: {
          "space-v": "xxl"
        },
        elemMods: {
          "space-v": "xl"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form__item form__item_space-v_xl"></div>');
    });

    it("Should works correctly with several mods", function() {
      const object = {
        block: "form",
        mods: {
          "space-v": "xxl",
          "space-h": "xl",
          disabled: true
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form form_space-v_xxl form_space-h_xl form_disabled"></div>'
        );
    });

    it("Should works correctly with several elemMods", function() {
      const object = {
        block: "form",
        elem: "item",
        elemMods: {
          "space-v": "xxl",
          "space-h": "xl",
          disabled: true
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form__item form__item_space-v_xxl form__item_space-h_xl form__item_disabled"></div>'
        );
    });
  });

  describe("Correctly compiles mix property", function() {
    it("Should works correctly with mix property as empty array", function() {
      const object = {
        block: "form",
        mix: []
      };
      chai.expect(templateEngine(object)).to.equal('<div class="form"></div>');
    });

    it("Should works correctly with mix property as array", function() {
      const object = {
        block: "form",
        mix: [
          {
            block: "warning"
          }
        ]
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form warning"></div>');
    });

    it("Should works correctly with mix property as object", function() {
      const object = {
        block: "form",
        mix: {
          block: "warning"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form warning"></div>');
    });

    it("Should works correctly with element mix", function() {
      const object = {
        block: "form",
        mix: {
          block: "warning",
          elem: "header"
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form warning__header"></div>');
    });

    it("Should works correctly with block and mods mix", function() {
      const object = {
        block: "form",
        mix: {
          block: "warning",
          mods: {
            "indent-b": "xxl"
          }
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal('<div class="form warning warning_indent-b_xxl"></div>');
    });

    it("Should works correctly with element and elemMods mix", function() {
      const object = {
        block: "form",
        mix: {
          block: "warning",
          elem: "header",
          elemMods: {
            "indent-b": "xxl"
          }
        }
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form warning__header warning__header_indent-b_xxl"></div>'
        );
    });

    it("Should works correctly with several mixes", function() {
      const object = {
        block: "form",
        mix: [
          {
            elem: "header",
            elemMods: {
              "indent-b": "xxl"
            }
          },
          {
            block: "informer",
            mods: {
              "indent-b": "xl"
            }
          }
        ]
      };
      chai
        .expect(templateEngine(object))
        .to.equal(
          '<div class="form form__header form__header_indent-b_xxl informer informer_indent-b_xl"></div>'
        );
    });
  });
});
