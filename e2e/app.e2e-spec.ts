import { TimesheetPage } from './app.po';

describe('timesheet App', function() {
  let page: TimesheetPage;

  beforeEach(() => {
    page = new TimesheetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
