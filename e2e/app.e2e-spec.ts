import { ScotchMusicPlayerPage } from './app.po';

describe('scotch-music-player App', function() {
  let page: ScotchMusicPlayerPage;

  beforeEach(() => {
    page = new ScotchMusicPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
