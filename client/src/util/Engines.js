/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

export const ENGINES = {
  PLATFORM: 'Camunda Platform',
  CLOUD: 'Camunda Cloud'
};

export const ENGINE_PROFILES = [
  {
    executionPlatform: ENGINES.PLATFORM,
    executionPlatformVersions: [ '7.19.0', '7.18.0', '7.17.0', '7.16.0', '7.15.0' ],
    latestStable: '7.19.0'
  },
  {
    executionPlatform: ENGINES.CLOUD,
    executionPlatformVersions: [ '8.2.0', '8.1.0', '8.0.0', '1.3.0', '1.2.0', '1.1.0', '1.0.0' ],
    latestStable: '8.2.0'
  }
];

export const ENGINE_LABELS = {
  [ ENGINES.PLATFORM ]: 'Camunda Platform 7',
  [ ENGINES.CLOUD ]: 'Camunda Platform 8'
};

export function getLatestStable(platform) {
  const profile = ENGINE_PROFILES.find(
    p => p.executionPlatform === platform
  );

  if (!profile) {
    throw new Error(`no profile for platform <${platform}>`);
  }

  return profile.latestStable;
}
