import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from '@progress/kendo-react-layout'

export default () => (
  <>
    <AppBar themeColor="dark">
      <AppBarSection>
        <h1 className="title">Kn Cloud</h1>
      </AppBarSection>

      <AppBarSpacer
        style={{
          width: 32,
        }}
      />

      <AppBarSection>
        <ul>
          <li>
            <span>Apps</span>
          </li>
        </ul>
      </AppBarSection>

      <AppBarSpacer />

      <AppBarSection>
        <button>Create New</button>
      </AppBarSection>
    </AppBar>
    <style jsx>{`
      .title {
        font-size: 20px;
        margin: 0;
      }
      ul {
        font-size: 16px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
      }
      li {
        margin: 0 10px;
      }
      li:hover {
        cursor: pointer;
        color: #84cef1;
      }
    `}</style>
  </>
)
