/**
 * @param  {object} obj — Структура блоков интерфейса в формате BEMJSON
 * @return {string} HTML разметка страницы
 */

export default function (obj) {
  function getClass (obj, argBlock) {
    const block = obj.block || argBlock;
    const base = block + (obj.elem ? '__' + obj.elem : '');
    const mods = obj.elem ? obj.elemMods : obj.mods;

    let output = base === argBlock ? '' : base;

    if (mods) {
      for (const i in mods) {
        output +=
          ' ' + base + '_' + i + (mods[i] === true ? '' : '_' + mods[i]);
      }
    }

    if (obj.mix) {
      if (!Array.isArray(obj.mix)) {
        obj.mix = [obj.mix];
      }
      for (let i = 0; i < obj.mix.length; i++) {
        const mix = obj.mix[i];
        if (!mix) {
          continue;
        }
        output += ' ' + getClass(mix, block);
      }
    }
    return output;
  }

  function getOutputClasses (obj, ctxBlock) {
    if (ctxBlock && obj.elem && !obj.block) {
      obj.block = ctxBlock;
    }

    const resultClass = obj.block || ctxBlock ? getClass(obj) : '';

    if (typeof obj !== 'object') {
      return obj;
    }
    // last condition is for empty object -> {}
    if (obj === undefined || obj === null || obj === false || (Object.keys(obj).length === 0 && obj.constructor === Object)) {
      return '';
    }
    return ' class="' + resultClass + '"';
  }

  function concatArray (array, ctxBlock) {
    let output = '';
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== undefined && array[i] !== false && array[i] !== null) {
        output += toHTML(array[i], ctxBlock);
      }
    }
    return output;
  }

  function toHTML (obj, ctxBlock) {
    if (obj === undefined || typeof obj === 'boolean' || obj === null) {
      return '';
    }
    if (typeof obj !== 'object') {
      return obj;
    }
    if (obj.block) {
      ctxBlock = obj.block;
    }
    if (Array.isArray(obj)) {
      return concatArray(obj, ctxBlock);
    }
    const defaultTag = 'div';
    const tag = obj.tag || defaultTag;

    const result = '<' + tag + getOutputClasses(obj, ctxBlock);
    return result + '>' + toHTML(obj.content, ctxBlock) + '</' + tag + '>';
  }

  return toHTML(obj);
}
