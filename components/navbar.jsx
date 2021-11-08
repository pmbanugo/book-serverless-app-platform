import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from '@progress/kendo-react-layout'
import { Button } from '@progress/kendo-react-buttons'
import Link from 'next/link'

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
            <Link href="/">
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link href="/new">
              <span>New</span>
            </Link>
          </li>
        </ul>
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
