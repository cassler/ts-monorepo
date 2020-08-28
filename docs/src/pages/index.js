import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Simple Out-of-the-Box</>,
		imageUrl: 'img/tag-0.png',
    description: (
      <>
        Workflower was designed from the ground up to be entirely portable and require no installation. Just unzip and run.
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
		imageUrl: 'img/tag-1.png',
    description: (
      <>
        Workflower lets you focus on actions and outcomes, we&apos;ll do the chores. Go
        ahead and drop raw implementation data  into the <code>guided interface</code>.
      </>
    ),
  },
  {
    title: <>No Servers</>,
		imageUrl: 'img/tag-2.png',
    description: (
      <>
        Workflower has no internal data or external dependencies. It runs locally and does not require an internet connection for any functionality.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title" className={clsx(styles.heroTitle)}>
						{siteConfig.title}
					</h1>
					<p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
						<Link
							className={clsx(
								'button button--fill button--secondary button--lg',
								styles.getStarted,
							)}
							to="https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/releases/download/0.9.1/workflower-portable-0.9.1-dist.zip">
							Download Workflower 0.9.1 (.zip)
            </Link>
					</div>
					<br />
					<div className={styles.buttons}>
						<Link
							className={clsx(
								'button button--fill button--primary button--md',
								styles.getStarted,
							)}
							to={useBaseUrl('/docs/intro')}>
							Quickstart Guide
            </Link>&nbsp;
						<Link
							className={clsx(
								'button button--fill button--primary button--md',
								styles.getStarted,
							)}
							to="https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/issues/new">
							Report an Issue
            </Link>

          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
