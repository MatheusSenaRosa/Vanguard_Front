import { rgba } from "polished";
import { FiChevronsLeft, FiChevronsUp } from "react-icons/fi";
import styled, { css } from "styled-components";

export const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const SideBar = styled.div<{ $isSideBarOpen?: boolean }>`
  ${({ theme, $isSideBarOpen }) => css`
    overflow-y: auto;
    width: 320px;

    transition: 0.3s;

    height: calc(100vh - 80px);
    background-color: ${theme.colors.neutral[60]};
    color: ${theme.colors.neutral[0]};
    box-shadow: 2px 0px 10px 1px ${rgba(theme.colors.neutral[100], 0.5)};

    overflow: visible;
    position: sticky;
    top: 80px;

    @media (max-width: 960px) {
      width: ${$isSideBarOpen ? "260px" : "40px"};
      position: absolute;
      height: 100%;
    }
  `}
`;

export const SideBarToggleButton = styled.div`
  display: none;
  @media (max-width: 960px) {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 10;
    justify-content: center;
    border-radius: 50px;
    cursor: pointer;
  }
`;

export const SideBarToggleButtonIcon = styled(FiChevronsLeft)<{ $dropDownState: boolean }>`
  ${({ theme, $dropDownState }) => css`
    position: absolute;
    right: -21px;
    width: fit-content;
    height: fit-content;
    transition: 0.3s;
    transform: ${$dropDownState ? "rotate(180deg)" : "none"};
    padding: 10px;
    font-size: 25px;
    border-radius: 50%;
    bottom: calc(-50vh);
    background-color: ${theme.colors.neutral[80]};
  `}
`;

export const DropdownButtonIcon = styled(FiChevronsUp)<{ $dropDownState: boolean }>`
  ${({ $dropDownState }) => css`
    transition: 0.3s;
    transform: ${$dropDownState ? "rotate(180deg)" : "none"};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    width: 100%;
    max-width: 1120px;
    padding: 80px;
  `}
`;

export const ClassText = styled.p``;

export const TechnologyCard = styled.div<{ $isSideBarOpen?: boolean }>`
  ${({ theme, $isSideBarOpen }) => css`
    color: ${theme.colors.neutral[0]};

    @media (max-width: 960px) {
      display: ${$isSideBarOpen ? "block" : "none"};
      overflow: hidden;
    }
  `}
`;

export const Video = styled.video`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const TechnologyCardTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.neutral[0]};
    background-color: ${theme.colors.neutral[80]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 15px;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.neutral[40]};
    }
  `}
`;

export const TechnologyCardItem = styled.h4<{ $isCurrentClass?: boolean }>`
  ${({ theme, $isCurrentClass }) => css`
    color: ${$isCurrentClass ? theme.colors.primary.blue : theme.colors.neutral[0]};
    font-weight: 400;
    padding: 15px;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.neutral[40]};
    }
  `}
`;

export const ContentTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.primary.yellow};
    margin-bottom: 15px;
    font-size: 28px;
  `}
`;

export const ClassTitle = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary.blue};
    font-size: 1.2rem;
  `}
`;

export const Dropdown = styled.button`
  ${({ theme }) => css`
    cursor: pointer;

    background-color: transparent;
    width: fit-content;

    display: flex;

    border: none;
    border-radius: 50px;

    svg {
      font-size: ${20}px;

      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const ClassList = styled.ul<{ $isDropDownOpen: boolean }>`
  ${({ $isDropDownOpen }) => css`
    transition: 0.3s;
    height: ${$isDropDownOpen ? "auto" : "0px"};
    display: ${$isDropDownOpen ? "block" : "none"};
  `}
`;

export const TechnologyCardPresentation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
