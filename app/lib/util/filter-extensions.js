/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

'use strict';

var {
  map
} = require('min-dash');

const { t } = require('i18next');


var EXTENSIONS = {
  all: {
    name: t('extensions.all.name'),
    extensions: [ '*' ]
  },
  supported: {
    name: t('extensions.supported.name'),
    extensions: [ 'bpmn', 'dmn', 'cmmn', 'xml' ]
  },
  images: {
    name: t('extensions.images.name'),
    extensions: [ 'png', 'jpeg', 'svg' ]
  },
  bpmn: {
    name: t('extensions.bpmn.name'),
    extensions: [ 'bpmn', 'xml' ]
  },
  dmn: {
    name: t('extensions.dmn.name'),
    extensions: [ 'dmn', 'xml' ]
  },
  cmmn: {
    name: t('extensions.cmmn.name'),
    extensions: [ 'cmmn', 'xml' ]
  },
  png: {
    name: t('extensions.png.name'),
    extensions: [ 'png' ]
  },
  jpeg: {
    name: t('extensions.jpeg.name'),
    extensions: [ 'jpeg' ]
  },
  svg: {
    name: t('extensions.svg.name'),
    extensions: [ 'svg' ]
  }
};

/**
 * Dialog filters based on file type(s).
 *
 * The passed argument can be a single string or a list of strings
 * for which extension filter objects are being returned.
 *
 * @param {string|Array} types
 *
 * @return {Array<Object>} extension filters
 */
function getFilters(types) {

  if (typeof types === 'string') {
    types = [ types ];
  }

  return map(types, function(fileType) {
    return EXTENSIONS[fileType];
  });
}

module.exports = getFilters;
