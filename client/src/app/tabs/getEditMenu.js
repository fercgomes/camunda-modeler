/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import Flags, { DISABLE_ADJUST_ORIGIN } from '../../util/Flags';

import { t } from 'i18next';

const SPACE_KEY = ' ';

const COLORS = [
  {
    title: t('colors.default'),
    fill: undefined,
    stroke: undefined
  }, {
    title: t('colors.blue'),
    fill: 'rgb(187, 222, 251)',
    stroke: 'rgb(30, 136, 229)'
  }, {
    title: t('colors.orange'),
    fill: 'rgb(255, 224, 178)',
    stroke: 'rgb(251, 140, 0)'
  }, {
    title: t('colors.green'),
    fill: 'rgb(200, 230, 201)',
    stroke: 'rgb(67, 160, 71)'
  }, {
    title: t('colors.red'),
    fill: 'rgb(255, 205, 210)',
    stroke: 'rgb(229, 57, 53)'
  }, {
    title: t('colors.purple'),
    fill: 'rgb(225, 190, 231)',
    stroke: 'rgb(142, 36, 170)'
  } ];

export function getAlignDistributeEntries({
  align,
  distribute
}) {
  return [ {
    label: t('edit.align.label'),
    enabled: align,
    submenu: [ t('edit.align.left'), t('edit.align.right'), t('edit.align.center'), t('edit.align.top'), t('edit.align.bottom'), t('edit.align.middle') ].map(direction => {
      return {
        label: `${t('edit.align.align')} ${direction}`,
        enabled: align,
        action: 'alignElements',
        options: {
          type: direction.toLowerCase()
        }
      };
    })
  }, {
    label: t('edit.distribute.label'),
    enabled: distribute,
    submenu: [ {
      label: t('edit.distribute.horizontally'),
      enabled: distribute,
      action: 'distributeElements',
      options: {
        type: 'horizontal'
      }
    }, {
      label: t('edit.distribute.vertically'),
      enabled: distribute,
      action: 'distributeElements',
      options: {
        type: 'vertical'
      }
    } ]
  } ];
}


export function getColorEntries({
  setColor
}) {
  return [ {
    label: t('colors.set'),
    enabled: setColor,
    submenu: COLORS.map(color => {
      return {
        label: `${color.title}`,
        enabled: setColor,
        action: 'setColor',
        options: {
          fill: color.fill,
          stroke: color.stroke
        },
        icon: `resources/icons/${color.title.toLowerCase()}-circle.png`
      };
    })
  } ];
}

export function getCanvasEntries({
  moveCanvas,
  moveToOrigin,
  moveSelection
}) {
  const menuEntries = [];

  if (isDefined(moveToOrigin) && Flags.get(DISABLE_ADJUST_ORIGIN)) {
    menuEntries.push({
      label: t('canvas.move_to_origin'),
      accelerator: 'CommandOrControl+Shift+O',
      enabled: moveToOrigin,
      action: 'moveToOrigin'
    });
  }

  return [
    ...menuEntries,
    {
      label: t('canvas.move'),
      enabled: moveCanvas,
      submenu: [ t('direction.up'), t('direction.left'), t('direction.down'), t('direction.right') ].reduce((entries, direction) => {
        return [
          ...entries,
          {
            label: `${direction}`,
            accelerator: `CommandOrControl + ${direction}`,
            enabled: moveCanvas,
            action: 'moveCanvas',
            options: {
              direction: direction.toLowerCase(),
              speed: 50
            }
          },
          {
            label: `${direction} (${t('accelerated')})`,
            accelerator: `CommandOrControl + Shift + ${direction}`,
            enabled: moveCanvas,
            action: 'moveCanvas',
            options: {
              direction: direction.toLowerCase(),
              speed: 200
            }
          }
        ];
      }, [])
    },
    {
      label: t('canvas.move_selection'),
      enabled: moveSelection,
      submenu: [ t('direction.up'), t('direction.left'), t('direction.down'), t('direction.right') ].reduce((entries, direction) => {
        return [
          ...entries,
          {
            label: `${direction}`,
            accelerator: direction,
            enabled: moveSelection,
            action: 'moveSelection',
            options: {
              direction: direction.toLowerCase()
            }
          },
          {
            label: `${direction} (${t('accelerated')})`,
            accelerator: `Shift + ${direction}`,
            enabled: moveSelection,
            action: 'moveSelection',
            options: {
              direction: direction.toLowerCase(),
              accelerated: true
            }
          }
        ];
      }, [])
    }
  ];
}

export function getCopyCutPasteEntries({
  copy,
  cut,
  paste
}) {
  return [ {
    label: t('copy'),
    accelerator: 'CommandOrControl + C',
    enabled: copy,
    action: 'copy',
  }, {
    label: t('cut'),
    accelerator: 'CommandOrControl + X',
    enabled: cut,
    action: 'cut'
  }, {
    label: t('paste'),
    accelerator: 'CommandOrControl + V',
    enabled: paste,
    action: 'paste'
  } ];
}

export function getDefaultCopyCutPasteEntries(inputActive) {
  return [ {
    label: t('copy'),
    role: 'copy',
    enabled: inputActive
  }, {
    label: t('cut'),
    role: 'cut',
    enabled: inputActive
  }, {
    label: t('paste'),
    role: 'paste',
    enabled: inputActive
  } ];
}

export function getDiagramFindEntries({
  find
}) {
  return [ {
    label: t('find'),
    accelerator: 'CommandOrControl+F',
    enabled: find,
    action: 'find'
  } ];
}

export function getSelectionEntries({
  inputActive,
  removeSelected,
  selectAll,
  replaceElement,
  createElement,
  appendElement

}) {
  const menuEntries = [];

  if (isDefined(selectAll)) {
    menuEntries.push({
      label: t('selection.all'),
      accelerator: 'CommandOrControl + A',
      enabled: selectAll,
      action: 'selectElements',
      role: inputActive && 'selectAll'
    });
  }

  if (isDefined(removeSelected)) {
    menuEntries.push({
      label: t('selection.remove'),
      accelerator: 'Delete',
      enabled: removeSelected,
      action: 'removeSelection',
      role: inputActive && 'delete'
    });
  }

  if (isDefined(appendElement)) {
    menuEntries.push({
      label: t('selection.append'),
      accelerator: 'A',
      enabled: appendElement,
      action: 'appendElement'
    });
  }

  if (isDefined(createElement)) {
    menuEntries.push({
      label: t('selection.create'),
      accelerator: 'N',
      enabled: createElement,
      action: 'createElement',
      options: {
        opt: 'bpmn:Task'
      }
    });
  }

  if (isDefined(replaceElement)) {
    menuEntries.push({
      label: t('selection.replace'),
      accelerator: 'R',
      enabled: replaceElement,
      action: 'replaceElement'
    });
  }

  return menuEntries;
}

export function getToolEntries({
  bpmn,
  editLabel,
  globalConnectTool,
  handTool,
  lassoTool,
  spaceTool
}) {
  const menuEntries = [];

  if (isDefined(handTool)) {
    menuEntries.push({
      label: t('tools.hand'),
      accelerator: 'H',
      enabled: handTool,
      action: 'handTool'
    });

    bpmn && handTool && menuEntries.push({
      visible: false,
      label: 'I\'m invisible!',
      custom: {
        key: SPACE_KEY,
        keypress: 'activateHandtool',
        keyup: 'deactivateHandtool'
      }
    });
  }

  if (isDefined(lassoTool)) {
    menuEntries.push({
      label: t('tools.lasso'),
      accelerator: 'L',
      enabled: lassoTool,
      action: 'lassoTool'
    });
  }

  if (isDefined(spaceTool)) {
    menuEntries.push({
      label: t('tools.space'),
      accelerator: 'S',
      enabled: spaceTool,
      action: 'spaceTool'
    });
  }

  if (isDefined(globalConnectTool)) {
    menuEntries.push({
      label: t('tools.global_connect'),
      accelerator: 'C',
      enabled: globalConnectTool,
      action: 'globalConnectTool'
    });
  }

  if (isDefined(editLabel)) {
    menuEntries.push({
      label: t('tools.edit'),
      accelerator: 'E',
      enabled: editLabel,
      action: 'directEditing'
    });
  }

  return menuEntries;
}

// undo and redo must be handled manually due to a bug in Chromium
// see https://github.com/electron/electron/issues/3682
export function getUndoRedoEntries({
  redo,
  undo
}) {
  return [ {
    label: t('undo'),
    accelerator: 'CommandOrControl+Z',
    enabled: undo,
    action: 'undo'
  }, {
    label: t('redo'),
    accelerator: 'CommandOrControl+Y',
    enabled: redo,
    action: 'redo'
  } ];
}

export function getDefaultUndoRedoEntries(inputActive) {
  return [ {
    label: t('undo'),
    role: 'undo',
    enabled: inputActive
  }, {
    label: t('redo'),
    role: 'redo',
    enabled: inputActive
  } ];
}

// helpers //////////

function isDefined(value) {
  return value !== undefined;
}
