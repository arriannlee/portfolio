export default function ProfileContent() {
  return (
    <div className="cv-profile">
      <header className="cv-profile-header">
        <h1>Arriann Lee</h1>

        <p className="cv-profile-role">
          <span>
            Creative Technologist. Entrepreneur. Digital Product Developer.
          </span>
        </p>
      </header>

      <fieldset className="cv-profile-group">
        <legend>Profile</legend>

        <div className="cv-profile-panel">
          <p>
            Creative technologist and entrepreneur with over 20 years of
            experience in business management, ecommerce, and operational
            leadership.
          </p>

          <p>
            Currently developing a full-stack hospitality SaaS platform while
            studying towards a BSc (Hons) in Creative Computing. Combining
            commercial insight, creative design and software development to
            build purposeful, user-focused digital products.
          </p>
        </div>
      </fieldset>

      <fieldset className="cv-profile-group">
        <legend>Away from the screen</legend>

        <div className="cv-profile-panel">
          <p>
            Dog agility enthusiast, although I am undecided whether I am
            training the dogs or the dogs are training me.
          </p>
        </div>
      </fieldset>
    </div>
  );
}
