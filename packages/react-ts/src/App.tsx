import React, { useState } from "react";
import "./App.css";
import ViewSettings from "./components/App/ViewSettings";
import { Modal, Layout, Card, Button, Divider, Badge } from "antd";
import { SettingOutlined, SwapOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import WorkflowForm from "./components/WorkflowForm";
import Stepper from "./components/App/Stepper";
import SaveContextButton from "./components/App/SaveContextButton";
import { WFProvider, WFContext } from "./context";
import ResultsView from "./components/ResultsView";
import ReportViewer from "./components/ReportViewer";
import { Router, RouteComponentProps, Link, useParams, useMatch } from "@reach/router"
import { ReportBuilder } from "./components/ReportBuilder";
import { ComponentProps } from "react";



function App() {
  const [defaultMode, toggleMode] = useState<boolean>(false);
   const layoutStyle = {
    display: "grid",
    gridTemplateColumns: defaultMode ? "300px 1fr" : "380px 1fr",
    height: "100vh",
    width: "100%",
  };
  const sideBarStyle = {
    padding: "96px 48px 24px 24px",
    display: "grid",
    gridTemplateRows: "1fr min-content",
  };

  const motionPrefs = {
    transition: {
      ease: "easeInOut",
      duration: 0.3,
      delay: 0,
    },
    initial: { y: -100, opacity: 0, scale: 0.7 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 100, opacity: 0, scale: 3.7 },
  };


  const toolbarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    background: "#fff",
    display: "grid",
    padding: "18px 24px",
    gridTemplateColumns: "1fr max-content",
    alignItems: "center",
    boxShadow: "2px 2px 8px rgba(100, 100, 100, 0.1)",
    zIndex: 500,
  };

  const [mode, setMode] = useState<string>('report')

  function renderNav() {
    const items = [
      { slug: 'home', label: 'Workflower' },
      { slug: 'delta', label: 'DeltaTool' },
      { slug: 'report', label: 'ReportBuilder' },
    ].map(i => (
      <Button type={mode === i.slug ? 'primary' : 'ghost'} onClick={() => setMode(i.slug)}>{i.label}</Button>
    ))
    return items;
  }
  const Toolbar = () => (
    <div style={toolbarStyle}>
      <h1 className="App-logo">
        Workflower <small>{defaultMode ? "Core" : "Delta"}</small>
      </h1>
      <div style={{ textAlign: "right" }}>
        {renderNav()}
        <Button
          size="small"
          type="link"
          href="https://pages.ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/"
          target="_blank"
        >
          Docs
        </Button>
      </div>
    </div>
  )

  let Home = () => (
    <WFContext.Consumer>
    {({ ctx }) => (
      <div style={layoutStyle}>
        <>
          <div style={sideBarStyle}>
            <Stepper
              partner={ctx.partner}
              setStep={ctx.setStep}
              refSize={ctx.reference?.data.length}
              reqSize={ctx.requested?.data.length}
              index={ctx.step}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                key="m3"
                disabled={!ctx.partner}
                onClick={() =>
                  ctx.togglePartnerSettings(!ctx.showPartnerSettings)
                }
                icon={<SettingOutlined />}
                title="Partner Settings"
              >
                Partner Settings {ctx.partner && `(${ctx.partner})`}
              </Button>
              <Divider />
              <SaveContextButton />
            </div>
          </div>
          <AnimatePresence exitBeforeEnter>
            {ctx.step <= 4 ? (
              <motion.div {...motionPrefs} key="0">
                <Card className="result-card">
                  <WorkflowForm />
                </Card>
              </motion.div>
            ) : (
              <motion.div {...motionPrefs} key="1">
                <ResultsView
                  partner_name={ctx.partner_name}
                  partner={ctx.partner}
                  log={ctx.log}
                  result={ctx.result}
                  liveCount={
                    ctx.config.live_ids ? ctx.config.live_ids.length : 0
                  }
                  handleBack={() => {
                    ctx.setStep(Math.max(0, ctx.step - 1));
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Modal
            title={`Partner Settings - ${ctx.partner}`}
            width={800}
            style={{ top: 24 }}
            visible={ctx.showPartnerSettings && ctx.config}
            onOk={() => ctx.togglePartnerSettings(false)}
            onCancel={() => ctx.togglePartnerSettings(false)}
          >
            <ViewSettings config={ctx.config} />
          </Modal>
        </>
      </div>
    )}
    </WFContext.Consumer>
  )

  return (
    <WFProvider>
      <Layout>
        <Toolbar />
        {mode === 'report' && <ReportBuilder />}
        {mode === 'delta' && <ReportViewer />}
        {mode === 'home' && <Home />}
      </Layout>
    </WFProvider>
  );
}

export default App;
