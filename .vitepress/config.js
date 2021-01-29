module.exports = {
  base: '/docs',
  title: 'Oxygen',
  description: 'Oxygen Documentation',
  themeConfig: {
      repo: 'xarples/oxygen',
      // docsRepo: 'oxy/doc',
      // editLinks: true,
      prevLink: true,
      nextLink: true,
      sidebar: [
        {
          link: '/getting-started',
          text: 'Getting started',
          children: []
        },
        {
          link: '/components',
          text: 'Components',
          children: [
            { link: '/components/button', text: 'Button' },
            { link: '/components/navigation', text: 'Navigation' }
          ]
        }
      // {
      //   link: '/',
      //   text: 'Introduction',
      //   children: [
      //     { link: '/install', text: 'Installation' },
      //     { link: '/dev', text: 'Dev' },
      //     { link: '/hmr', text: 'HMR' },
      //   ]
      // },
      // {
      //   link: '/usage',
      //   text: 'Usage',
      // },
      // {
      //   link: '/materials/',
      //   text: 'Materials',
      //   children: [
      //     { link: '/materials/textures', text: 'Textures' },
      //   ]
      // },
      // {
      //   link: '/lights/',
      //   text: 'Lights',
      // },
      // {
      //   link: '/meshes/',
      //   text: 'Meshes',
      //   children: [
      //     { link: '/meshes/', text: 'Introduction' },
      //     { link: '/meshes/geometries', text: 'Geometries' },
      //     { link: '/meshes/image', text: 'Image' },
      //     { link: '/meshes/instanced', text: 'InstancedMesh' },
      //     { link: '/meshes/sprite', text: 'Sprite' },
      //   ]
      // },
      // {
      //   link: '/shadows',
      //   text: 'Shadows',
      // },
      // {
      //   link: '/postprocessing/',
      //   text: 'Postprocessing',
      // },
      // {
      //   link: '/components/',
      //   text: 'Components',
      // },
    ],
  },
};