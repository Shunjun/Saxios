import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Saxios, { SaxiosError } from '../../src';

const instance = Saxios.create({});

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total;
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use((config) => {
      NProgress.start();
      return config;
    });
  };

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e);
      NProgress.set(calculatePercentage(e.loaded, e.total));
    };
    instance.default.onDownloadProgress = update;
    instance.default.onUploadProgress = update;
  };

  const setupStopProgress = () => {
    instance.interceptors.response.use(
      (response) => {
        NProgress.done();
        return response;
      },
      (error) => {
        NProgress.done();
        return Promise.reject(error);
      },
    );
  };

  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}

loadProgressBar();

const downloadEl = document.getElementById('download');

downloadEl!.addEventListener('click', () => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg');
});

const uploadEl = document.getElementById('upload');

uploadEl!.addEventListener('click', () => {
  const data = new FormData();
  const fileEl = document.getElementById('file') as HTMLInputElement;
  if (fileEl.files) {
    data.append('file', fileEl.files[0]);

    instance.post('/more/upload', data);
  }
});

const authEl = document.querySelector('#auth');

authEl!.addEventListener('click', () => {
  Saxios.post(
    '/more/post',
    {
      a: 1,
    },
    {
      // auth: {
      //   username: 'Yee',
      //   password: '123456',
      // },
    },
  ).then((res) => {
    console.log(res);
  });
});

const threeEL = document.querySelector('#304');
threeEL!.addEventListener('click', () => {
  Saxios.get('/more/304')
    .then((res) => {
      console.log(res);
    })
    .catch((e: SaxiosError) => {
      console.log(e.message);
    });

  Saxios.get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400;
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e: SaxiosError) => {
      console.log(e.message);
    });
});
