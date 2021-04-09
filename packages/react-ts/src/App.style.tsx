import { css, jsx } from "@emotion/core";

export const AppStyle = css`
  @import "~normalize.css";
  @import "~@blueprintjs/core/lib/css/blueprint.css";
  @import "~@blueprintjs/icons/lib/css/blueprint-icons.css";

  .App {
    text-align: center;
  }

  *,
  * + *,
  body,
  html {
    box-sizing: border-box;
  }

  body {
    background-color: rgb(240, 242, 245) !important;
    /* display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	align-items: center; */
  }

  h2 {
    font-weight: 800;
  }

  .addition {
    color: rgba(62, 156, 20, 1) !important;
  }
  .deletion {
    color: rgba(255, 77, 79, 1) !important;
  }
  .row-deletion {
    color: #999;
  }
  .row-deletion .ant-table-row-expand-icon-cell {
    color: rgba(0, 0, 0, 0.65) !important;
  }
  .ant-table-container {
    padding: 12px;
  }

  tr + tr.ant-table-expanded-row {
    background-color: #fec !important;
  }
  .current-tab {
    border-bottom: 3px solid blue;
  }
  .ant-popover-inner-content {
    max-width: 400px;
  }
  .ant-alert-description {
    font-size: 13px !important;
    line-height: 17px !important;
  }
  .scoreCard {
    border-bottom: 3px solid #ccc !important;
    cursor: pointer;
    border-radius: 7px;
    opacity: 0.85 !important;
    transition: all 0.15s;
  }
  .scoreCard h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .scoreCard.ghost {
    background: transparent;
    opacity: 0.5;
  }
  .scoreCard:hover {
    border-bottom-color: #aaa !important;
    transform: scale(1.02);
  }
  .scoreCard.current-tab {
    border-bottom: 3px solid #096dd9 !important;
    opacity: 1 !important;
  }
  .scoreCard.current-tab:hover {
    border-bottom: 3px solid #096dd9 !important;
  }

  .scoreCard h1 {
    font-size: 60px;
    letter-spacing: -0.033em;
    padding: 0;
    margin: 0;
  }
  .App-logo {
    font-weight: 800;
    color: #333;
    letter-spacing: -0.05em;
    padding: 0;
    text-align: left;
    font-size: 26px;
    margin: 0;
  }

  .App-logo small {
    font-weight: 300;
    letter-spacing: 0;
    color: #666;
    text-transform: uppercase;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      /* animation: App-logo-spin infinite 20s linear; */
    }
  }

  #rc-tabs-0-tab-1 {
    font-weight: bold;
    font-size: 20px;
  }
  .App-header {
    background-color: #282c34;
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .result-card {
    min-height: 100vh;
    display: grid;
    align-content: center;
    /* 1px 10px 12px rgba(50,50,50,0.2) */
  }

  .App-link {
    color: #61dafb;
  }

  .App-list {
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    width: 550px;
  }

  .App-control {
    width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .upload-ui {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1fr;
    gap: 48px;
    /* > * {max-width: 50%} */
  }

  .Stat-Group {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    gap: 48px;
    justify-content: center;
  }
  .Statline {
    display: flex;
    justify-content: space-around;
  }

  .Statline > div {
    margin: 5px;
  }

  .Partner-Settings-Panel {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 48px;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  .button-group-wf a {
    margin-right: 5px;
  }

  .GridFour {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content max-content;
    gap: 20px;
  }

  .main-output {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .remark {
    padding: 12px 24px;
    border-radius: 8px;
    margin: 10px 0;
    line-height: 16px;
    background-color: rgba(100, 100, 110, 0.066);
    border: 1px solid rgba(100, 100, 110, 0.099);
    color: #667;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .stacked-bar {
    width: 100%;
    height: 30px;
    line-height: 22px;
    font-size: 13px;
    /* text-transform: uppercase; */
    font-weight: 600;
    color: #fff;

    letter-spacing: -0.05em;
    padding: 0;
    background: transparent;
    border: 1px solid #cecfd3;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
  }

  .stacked-bar > div {
    padding: 3px 8px;
    margin: 0;
    text-align: center;
    /* display: inline-block; */
  }

  .stacked-bar:nth-child(1) {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .stacked-bar .green {
    background-color: rgba(82, 196, 26, 0.8);
    box-shadow: inset 0 0 1px rgba(82, 196, 26, 1);
    text-shadow: -1px -1px 3px #377f13;
  }

  .stacked-bar .blue {
    background-color: rgba(24, 144, 255, 1);
    box-shadow: inset 0 0 1px rgba(24, 144, 255, 1);
    text-shadow: -1px -1px 3px #1b4871;
  }

  .stacked-bar .yellow {
    background-color: rgba(250, 173, 20, 1);
    box-shadow: inset 0 0 1px rgba(250, 173, 20, 1);
    text-shadow: -1px -1px 3px #9a7120;
  }

  .stacked-bar .warn {
    background-color: #f5222d;
    box-shadow: inset 0 0 1px #f5222d;
    text-shadow: -1px -1px 3px #a4242b;
  }

  .validation-error input {
    border: 1px solid #f5222d;
  }
`;