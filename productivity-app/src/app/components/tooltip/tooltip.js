require('jquery-ui/ui/widgets/tooltip');
require('./tooltip.less');
$(() => {
  $(document).tooltip({
    track: true,
    tooltipClass: "tooltip",
    position: {my: 'center+25 bottom+60',
      at: 'center top'},

})});
