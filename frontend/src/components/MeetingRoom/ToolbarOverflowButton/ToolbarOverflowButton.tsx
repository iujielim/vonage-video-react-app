import { ReactElement, useState } from 'react';
import { Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToolbarButton from '../ToolbarButton';
import ToolbarOverflowMenu from '../ToolbarOverflowMenu';
import UnreadMessagesBadge from '../UnreadMessagesBadge';

export type ToolbarOverflowButtonProps = {
  toggleShareScreen: () => void;
  isSharingScreen: boolean;
  toolbarButtonsCount: number;
};

/**
 * ToolbarOverflowButton Component
 *
 * Displays a clickable button that opens a grid of hidden toolbar buttons for smaller viewports. There
 * is also an unread chat messages indicator that is shown when there are messages to be read.
 * @param {ToolbarOverflowButtonProps} props - the props for the component
 *  @property {Function} toggleShareScreen - toggles the user's screenshare
 *  @property {boolean} isSharingScreen - whether the user is sharing their screen
 *  @property {number} toolbarButtonsCount - number of buttons displayed on the toolbar
 * @returns {ReactElement} - The ToolbarOverflowButton Component.
 */
const ToolbarOverflowButton = ({
  toggleShareScreen,
  isSharingScreen,
  toolbarButtonsCount,
}: ToolbarOverflowButtonProps): ReactElement => {
  const [isToolbarOverflowMenuOpen, setIsToolbarOverflowMenuOpen] = useState<boolean>(false);
  const [openEmojiGridMobile, setOpenEmojiGridMobile] = useState<boolean>(true);

  const handleButtonToggle = () => {
    setIsToolbarOverflowMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClickAway = (event?: MouseEvent | TouchEvent) => {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.closest('#hidden-toolbar-items')) {
        return;
      }
    }
    setIsToolbarOverflowMenuOpen(false);
  };

  return (
    <>
      <Tooltip
        title="Access additional toolbar items"
        aria-label="open additional toolbar items menu"
      >
        <UnreadMessagesBadge isToolbarOverflowMenuOpen={isToolbarOverflowMenuOpen}>
          <ToolbarButton
            data-testid="hidden-toolbar-items"
            id="hidden-toolbar-items"
            onClick={handleButtonToggle}
            icon={
              <MoreVertIcon
                style={{ color: `${!isToolbarOverflowMenuOpen ? 'white' : 'rgb(138, 180, 248)'}` }}
              />
            }
            sx={{
              marginRight: '0px',
              width: '48px',
            }}
          />
        </UnreadMessagesBadge>
      </Tooltip>
      <ToolbarOverflowMenu
        isOpen={isToolbarOverflowMenuOpen}
        isEmojiGridOpen={openEmojiGridMobile}
        setIsEmojiGridOpen={setOpenEmojiGridMobile}
        toggleShareScreen={toggleShareScreen}
        isSharingScreen={isSharingScreen}
        closeMenu={handleClickAway}
        toolbarButtonsCount={toolbarButtonsCount}
      />
    </>
  );
};

export default ToolbarOverflowButton;
