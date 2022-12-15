import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  transform: {
    '\\.css\\.ts$': '@vanilla-extract/jest-transform',
  },
};
