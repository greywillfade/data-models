const loadModel = require('./loadModel');

describe('loadModel', () => {
  it('should throw if passed an invalid model name', () => {
    const modelLoadTest = () => loadModel('../InvalidModel');
    expect(modelLoadTest).toThrow();
  });

  it('should throw if passed a model that doesn\'t exist', () => {
    const modelLoadTest = () => loadModel('InvalidModel');
    expect(modelLoadTest).toThrow();
  });

  it('should return a valid model as JSON', () => {
    const modelData = loadModel('Event');
    expect(typeof modelData).toBe('object');
    expect(modelData.type).toBe('Event');
  });
  it('should return inherited properties from parent classes', () => {
    const modelData = loadModel('Showers');
    expect(typeof modelData).toBe('object');
    expect(modelData.type).toBe('Showers');
    expect(modelData.subClassGraph.length).toBe(1);
    expect(modelData.subClassGraph[0]).toBe('#LocationFeatureSpecification');
    expect(typeof modelData.fields.value).toBe('object');
    expect(modelData.fields.value.inheritedFrom).toBe('#LocationFeatureSpecification');
    expect(modelData.fields.type.requiredContent).toBe('Showers');
  });
});
