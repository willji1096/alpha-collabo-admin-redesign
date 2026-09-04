## 검토 보고서

| 항목 | 결론 | 파일:라인 + 현재값→제안값 | 근거 | 리스크 |
|---|---|---|---|---|
| 1. Hover | 회색 전체 채움은 다소 강함. 유지하되 더 옅게 조정 | `css/admin.css:1345`, `css/superpass.css:48` — `--bg-hover` → `--bg-subtle` | Shopify는 테이블 행을 개별 레코드 단위로 취급하고, Material은 hover를 상호작용 상태로 사용함. 밀도 높은 행에서는 `neutral-50`이 정보·버튼 대비를 덜 방해함. [Shopify Polaris Table](https://shopify.dev/docs/api/app-home/v1.1-rc/web-components/layout-and-structure/table), [Material States](https://m3.material.io/foundations/interaction/states/overview) | 너무 옅으면 포인터 위치 인지가 약해질 수 있음 |
| 2. Selected | `red-50` 전체 채움은 부적절. 선택은 중립 배경 + 좌측 브랜드 바 권장 | `css/admin.css:1349-1354`, `1369`, `1385`; `css/superpass.css:49` — `--accent-light` → `--bg-subtle` + `3px solid var(--accent)` 좌측 바 | styleseed의 “impact color는 작은 영역에만” 원칙과 충돌. 레드 배경 위의 `--accent` Primary 버튼은 위계가 합쳐져 선택/에러/실행 버튼 구분이 약해짐. Atlassian도 hover·selected를 별도 상태 토큰으로 분리함. [Atlassian Color](https://atlassian.design/foundations/color-new/) | 좌측 바가 누락된 테이블에서는 선택 상태가 약하게 보일 수 있음 |
| 3. Selected + Hover | hover가 selected를 덮지 않도록 selected 우선 규칙 고정 | `css/admin.css:1352-1354`, `css/superpass.css:48-49` — `color-mix(...)` 및 cascade 의존 → `selected:hover`도 `--bg-subtle` 유지 | Material은 selection과 hover가 동시에 적용될 수 있으므로 상태 조합 규칙을 명시하라고 안내함. [Material States](https://m3.material.io/foundations/interaction/states/overview) | 별도 우선순위가 없으면 테이블별 CSS 로딩 순서에 따라 시각 상태가 달라짐 |
| 4. 묶음 vs 캠페인 행 | 선택은 신청 묶음, hover는 캠페인 행으로 분리 | `superpass-first-review.html:91-104`, `css/superpass.css:47-49` — checkbox·병합 셀·선택·hover 모두 묶음 단위 → checkbox 선택은 묶음 유지, hover는 `.sp-bundle tr:hover` | checkbox와 influencer 정보가 `rowspan` 묶음에 속하지만, `1차 컨펌 완료`·`미선정`은 캠페인 행별 액션임. Shopify도 각 `table row`를 하나의 레코드/행동 단위로 정의함. [Shopify Polaris Table](https://shopify.dev/docs/api/app-home/v1.1-rc/web-components/layout-and-structure/table) | 선택 배경과 hover 대상이 달라 초기 학습 비용이 생길 수 있음 |
| 5. 전체 어드민 규칙 | 행 hover는 중립 약한 표면, 선택은 중립 표면 + accent 바, 선택 상태가 hover보다 우선 | `docs/DESIGN.md:388-393` — `행 호버: --bg-hover / 선택 행: --accent-light` → `행 호버: --bg-subtle / 선택 행: --bg-subtle + 좌측 3px --accent 바 / selected:hover 동일 유지` | 현재 브랜드 레드의 의미 충돌을 피하면서 styleseed의 단일 accent 원칙을 유지함 | 기존 문서·CSS·개별 화면 규칙을 함께 갱신하지 않으면 화면별 불일치 발생 |

### DESIGN.md 7.x 삽입 문장

- `행 호버는 --bg-subtle, 선택 행은 --bg-subtle과 좌측 3px --accent 바를 사용하며, 선택 상태는 hover보다 우선한다.`

## 우선순위 상위 3개

1. 선택 행의 `--accent-light` 전체 채움을 `--bg-subtle` + 좌측 `--accent` 바으로 변경
2. selected + hover 우선순위를 전 어드민 공통 규칙으로 고정
3. 슈퍼패스에서 hover는 캠페인 행, 선택은 신청 묶음 단위로 분리

파일은 수정하지 않았습니다.
| 항목 | 파일:라인 + 판정 | 근거 |
|---|---|---|
| 1. 선택 우선순위 | `css/admin.css:1351-1358` — **OK**. `.tbl tbody tr:has(...:checked):hover`가 일반 hover보다 specificity가 높아 `--bg-hover`를 적용함. `css/superpass.css:49-52` — **OK**. `.tbl .sp-bundle:has(...):hover tr`가 묶음 전체에 적용됨. 단, 일반 rowspan 테이블에서는 `css/admin.css:1351`이 체크박스를 포함한 첫 `tr`만 선택 처리하므로 후속 행은 선택 배경이 누락될 수 있음. | 현재 조합에서는 cascade 순서가 바뀌어도 selected-hover selector가 일반 hover보다 specificity가 높음. rowspan 일반 테이블까지 보장하려면 `tbody:has(.c-chk input:checked) tr` 계열이 필요함. |
| 2. sticky 고정 컬럼 | `css/admin.css:1362-1392` — **OK**. `td.c-chk`, `td.sticky-col` 모두 hover=`--bg-subtle`, selected=`--bg-subtle`, selected-hover=`--bg-hover`로 본체와 일치함. 기본 상태의 `--bg-surface`도 `.tbl-wrap` 표면과 동일함. | 상태별 고정 컬럼 배경 selector가 각각 존재하고 selected-hover가 마지막에 선언됨. |
| 3. 좌측 3px inset bar | `css/admin.css:1354-1356`, `css/superpass.css:51` — **OK, 조건부**. `box-shadow: inset 3px 0 0 var(--accent)`는 `border-collapse: collapse`의 셀 크기·열 폭을 변경하지 않아 border 방식보다 안전함. sticky `z-index: 2`와도 충돌 없음. 체크박스는 셀 중앙에 있어 일반적으로 겹치지 않음. | 리스크는 첫 셀 폭이 과도하게 좁거나 `padding`이 별도 변경되는 테이블에서만 발생. `border-inline-start`는 border-collapse와 border conflict/폭 변화 가능성이 있어 현재 방식 유지가 더 안전함. |
| 4. 선택 행 hover `--bg-hover` 보정 | `css/admin.css:1357-1358`, `css/admin.css:1375`, `1392`, `css/superpass.css:52` — **OK**. 선택 상태를 잃지 않고 포인터 반응만 한 단계 강화함. | “선택이 hover보다 우선”은 선택 행이 일반 hover selector에 의해 무시되지 않는다는 의미이며, selected-hover의 표면값을 `--bg-hover`로 별도 정의하는 것은 유효함. |
| 5. DESIGN.md §7.3 최종 문장 | `docs/DESIGN.md:388-396` — **수정 권장** | 아래 3줄로 확정. |

- 기본 행 hover는 `--bg-subtle`을 사용한다.
- 선택 행은 `--bg-subtle`과 첫 셀 inset `3px --accent` 바를 사용한다.
- 선택 행 hover는 `--bg-hover`를 사용하며, rowspan 묶음 테이블은 hover·선택을 `tbody` 묶음 단위로 적용한다.
