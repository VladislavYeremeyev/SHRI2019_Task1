/**
 * @param  {object} obj — Структура блоков интерфейса в формате BEMJSON
 * @return {string} HTML разметка страницы
 */

export default function(obj) {
  function outputClasses(obj, ctxBlock) {
    if (ctxBlock && obj.elem && !obj.block) {
      obj.block = ctxBlock;
    }

    let resultClass = obj.block || ctxBlock ? bemClass(obj) : '';

    if (typeof obj !== 'object') {
      return obj;
    }
    if (obj === undefined || obj === null || obj === false) {
      return '';
    }
    return ' class="' + resultClass + '"';
  }

  function bemClass(obj, argBlock) {
    const block = obj.block || argBlock;
    const base = block + (obj.elem ? '__' + obj.elem : '');
    const mods = obj.elem ? obj.elemMods : obj.mods;

    let output = base === argBlock ? '' : base;

    if (mods) {
      for (let i in mods) {
        output += ' ' + base + '_' + i + (mods[i] === true ? '' : '_' + mods[i]);
      }
    }

    if (obj.mix) {
      if (!Array.isArray(obj.mix)) {
        obj.mix = [obj.mix];
      }
      for (let i = 0; i < obj.mix.length; i++) {
        let mix = obj.mix[i];
        if (!mix) {
          continue;
        }
        output += ' ' + bemClass(mix, block);
      }
    }
    return output;
  }

  function toHTML(obj, ctxBlock) {
    if (obj === undefined || obj === false || obj === null) {
      return '';
    }
    if (obj.block) {
      ctxBlock = obj.block;
    }
    if (Array.isArray(obj)) {
      return concatArray(obj, ctxBlock);
    }
    const DEFAULT_TAG = 'div';
    obj.tag = obj.tag || DEFAULT_TAG;

    const result = '<' + obj.tag + outputClasses(obj, ctxBlock);
    return result + '>' + toHTML(obj.content, ctxBlock) + '</' + obj.tag + '>';
  }

  function concatArray(array, ctxBlock) {
    let output = '';
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== undefined && array[i] !== false && array[i] !== null) {
        output += toHTML(array[i], ctxBlock);
      }
    }
    return output;
  }
  return toHTML(obj);
}
