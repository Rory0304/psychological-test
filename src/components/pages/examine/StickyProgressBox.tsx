import styled from 'styled-components';

interface StickyProgressBoxProps {
  progress: number;
  isSticky?: boolean;
}

const StyledStickyProgressBox = styled.div<{ isSticky: boolean }>`
  width: fit-content;
  display: ${props => (props.isSticky ? 'block' : 'none')};
  position: fixed;
  bottom: 50%;
  right: 0;
  margin: 5rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 100%;
  opacity: 0.8;

  span {
    font-weight: bold;
  }
`;

const StickyProgressBox: React.FC<StickyProgressBoxProps> = ({
  progress,
  isSticky = false,
}) => {
  console.log('isSticky', isSticky);
  return (
    <StyledStickyProgressBox isSticky={isSticky}>
      <span>{progress} %</span>
    </StyledStickyProgressBox>
  );
};

export default StickyProgressBox;
