import React, { useState } from 'react';
import ResourceLink from './ResourceLink';
import ResourceModal from '../modals/ResourceModal';

const resources = [
  {
    label: 'Documentation',
    content: (
      <>
        <p className="mb-4">
          Welcome to the AI Launchpad documentation. Here you'll find comprehensive guides and documentation to help you start working with our platform as quickly as possible.
        </p>
        <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Platform Overview</li>
          <li>Quick Start Guide</li>
          <li>Core Concepts</li>
          <li>Best Practices</li>
        </ul>
      </>
    ),
    links: [
      { label: 'Platform Guide', url: '#' },
      { label: 'API Documentation', url: '#' },
      { label: 'Smart Contract Examples', url: '#' },
      { label: 'Security Best Practices', url: '#' }
    ]
  },
  {
    label: 'API Reference',
    content: (
      <>
        <p className="mb-4">
          Our API reference provides detailed information about endpoints, parameters, and responses for integrating with the AI Launchpad platform.
        </p>
        <h3 className="text-lg font-semibold mb-2">API Sections</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Authentication</li>
          <li>Projects</li>
          <li>Smart Contracts</li>
          <li>Analytics</li>
        </ul>
      </>
    ),
    links: [
      { label: 'REST API Docs', url: '#' },
      { label: 'GraphQL Schema', url: '#' },
      { label: 'SDK Documentation', url: '#' },
      { label: 'API Changelog', url: '#' }
    ]
  },
  {
    label: 'Security Guidelines',
    content: (
      <>
        <p className="mb-4">
          Security is our top priority. Learn about our security features and best practices for keeping your projects safe.
        </p>
        <h3 className="text-lg font-semibold mb-2">Key Security Features</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Smart Contract Auditing</li>
          <li>Access Control</li>
          <li>Vulnerability Prevention</li>
          <li>Security Updates</li>
        </ul>
      </>
    ),
    links: [
      { label: 'Security Checklist', url: '#' },
      { label: 'Audit Reports', url: '#' },
      { label: 'Incident Response', url: '#' },
      { label: 'Security Updates', url: '#' }
    ]
  },
  {
    label: 'Community Forum',
    content: (
      <>
        <p className="mb-4">
          Join our vibrant community of developers, founders, and blockchain enthusiasts. Share knowledge, get help, and collaborate on projects.
        </p>
        <h3 className="text-lg font-semibold mb-2">Popular Categories</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>General Discussion</li>
          <li>Technical Support</li>
          <li>Project Showcase</li>
          <li>Feature Requests</li>
        </ul>
      </>
    ),
    links: [
      { label: 'Join Discord', url: '#' },
      { label: 'Telegram Group', url: '#' },
      { label: 'Developer Forum', url: '#' },
      { label: 'Community Guidelines', url: '#' }
    ]
  }
];

const ResourceLinks = () => {
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);

  return (
    <>
      <section className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
        <h2 className="text-xl font-bold mb-4">Resources</h2>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <ResourceLink
              key={index}
              label={resource.label}
              onClick={() => setSelectedResource(resource)}
            />
          ))}
        </div>
      </section>

      <ResourceModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource!}
      />
    </>
  );
};

export default ResourceLinks;