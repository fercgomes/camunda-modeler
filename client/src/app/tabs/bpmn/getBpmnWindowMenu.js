/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { t } from 'i18next';

export default function getBpmnWindowMenu(state) {
  return [
    ...getZoomEntries(state),
    ...getPropertiesPanelEntries(state)
  ];
}

function getZoomEntries({ zoom }) {
  return zoom ? [ {
    label: t('zoom.in'),

    // We use Ctrl + = instead of Ctrl + + which works as expected but is shown incorrectly.
    // cf. https://github.com/camunda/camunda-modeler/issues/2286
    accelerator: 'CommandOrControl+=',
    action: 'zoomIn'
  }, {
    label: t('zoom.out'),
    accelerator: 'CommandOrControl+-',
    action: 'zoomOut'
  }, {
    label: t('zoom.actual'),
    accelerator: 'CommandOrControl+0',
    action: 'resetZoom'
  }, {
    label: t('zoom.fit'),
    accelerator: 'CommandOrControl+1',
    action: 'zoomFit'
  }, {
    type: 'separator'
  } ] : [];
}

function getPropertiesPanelEntries({ propertiesPanel }) {
  return propertiesPanel ? [ {
    label: t('properties_panel.toggle'),
    accelerator: 'CommandOrControl+P',
    action: 'toggleProperties'
  }, {
    label: t('properties_panel.reset'),
    accelerator: 'CommandOrControl+Shift+P',
    action: 'resetProperties'
  } ] : [];
}
