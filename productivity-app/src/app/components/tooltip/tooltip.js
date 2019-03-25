import tooltip from 'jquery-ui/ui/widgets/tooltip';
import tooltipStyles from './tooltip.less';

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
