const Footer = () => {
  return (
    <footer className="footer bg-light text-center py-4 fixed-bottom shadow-sm">
      <p className="mb-0 text-muted">
        © {new Date().getFullYear()} <strong>Learnify</strong> | Made by Batch 9
      </p>
    </footer>
  );
};

export default Footer;
