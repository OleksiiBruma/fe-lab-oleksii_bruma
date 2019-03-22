require('jquery-ui/ui/widgets/tooltip');
require('./tooltip.less');

$(() => {
  $(document).tooltip({
    position: {
      at: 'center top',
      my: 'center+25 bottom+60',
    },
    tooltipClass: 'tooltip',
    track: true,
  });
});
